import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, LinearScale, registerables } from 'chart.js';
import { DoadoresService } from '../../services/doadores.service';

Chart.register(...registerables);

@Component({
  selector: 'app-doadores',
  templateUrl: './doadores.component.html',
  styleUrls: ['./doadores.component.css'],
})
export class DoadoresComponent implements OnInit {
  meuGrafico: Chart = {} as Chart;
  meuGrafico2: Chart = {} as Chart;
  meuGrafico3: Chart = {} as Chart;
  meuGrafico4: Chart = {} as Chart;
  meuGrafico5: Chart = {} as Chart;

  constructor(private doadores: DoadoresService) {}

  ngOnInit(): void {
    this.doadoresPorEstado();
    this.percentualObesos();
    this.IMCMedioPorFaixaIdade();
    this.doadorReceptor();
    this.calcularImcMedioPorFaixaIdade();
  }

  doadoresPorEstado() {
    this.doadores.contagemPorEstado().subscribe((response: any) => {
      this.chartDoadoresPorEstado(response);
    });
  }

  chartDoadoresPorEstado(dados: any[]) {
    const ctx = document.getElementById('meuGrafico') as HTMLCanvasElement;

    const labels = dados.map((item: any) => item.faixa_idade);
    const data = dados.map((item: any) => item.total_candidatos);

    this.meuGrafico = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total de doadores',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  calcularImcMedioPorFaixaIdade() {
    this.doadores.PercentualImcFaixa().subscribe((response: any) => {
      this.chartcalcularImcMedioPorFaixaIdade(response);
    });
  }

  chartcalcularImcMedioPorFaixaIdade(dados: any[]) {
    const ctx = document.getElementById('meuGrafico5') as HTMLCanvasElement;

    const faixasIdade = dados.map((item: any) => item.faixa_idade);
    const imcMedio = dados.map((item: any) => item.total_candidatos);

    this.meuGrafico5 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: imcMedio,
        datasets: [
          {
            label: 'Idade',
            data: faixasIdade,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Idade Média ',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Tipo sanguíneo',
            },
          },
        },
      },
    });
  }

  percentualObesos() {
    this.doadores.percentualObesosSexo().subscribe((response: any) => {
      this.chartDoadoresPercentualObesos(response);
      console.log(response);
    });
  }

  chartDoadoresPercentualObesos(dados: any[]) {
    const ctx = document.getElementById('meuGrafico2') as HTMLCanvasElement;

    // const labels = dados.map((item: any) => item.Sexo);
    const data = dados.map((item: any) => item.percentual_obesos);

    const totalMasculino = dados[1].Total;
    const obesosMasculino = dados[1].obesos;

    const totalFeminino = dados[0].Total;
    const obesosFeminino = dados[0].obesos;

    const labels = ['Feminino', 'Masculino'];
    const colors = ['rgba(75, 192, 192, 0.2)', 'rgba(192, 75, 75, 0.2)'];
    const borderColors = ['rgba(75, 192, 192, 1)', 'rgba(192, 75, 75, 1)'];

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderColor: borderColors,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });

    var totalParticipantes = 151;
    var totalObesos = 28;
  }

  IMCMedioPorFaixaIdade() {
    this.doadores.MediaIdadeTipoSanguineo().subscribe((response: any) => {
      this.chartIMCMedioPorFaixaIdade(response);
      console.log('teste');
      console.log(response);
    });
  }

  chartIMCMedioPorFaixaIdade(dados: any[]) {
    const ctx = document.getElementById('meuGrafico3') as HTMLCanvasElement;

    const faixasIdade = dados.map((item: any) => item.media);
    const imcMedio = dados.map((item: any) => item.Tipo);

    this.meuGrafico3 = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: imcMedio,
        datasets: [
          {
            label: 'Idade',
            data: faixasIdade,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {},
      },
    });
  }

  doadorReceptor() {
    this.doadores.doadorReceptor().subscribe((response: any) => {
      this.chartdoadorReceptor(response);
      console.log('teste');
      console.log(response);
    });
  }

  chartdoadorReceptor(dados: any[]) {
    const ctx = document.getElementById('meuGrafico4') as HTMLCanvasElement;

    const faixasIdade = dados.map((item: any) => item.quantidade);
    const imcMedio = dados.map((item: any) => item.Tipo);

    this.meuGrafico4 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: imcMedio,
        datasets: [
          {
            label: 'Quantidade de doadores',
            data: faixasIdade,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Doadores',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Tipo sanguíneo',
            },
          },
        },
      },
    });
  }
}
