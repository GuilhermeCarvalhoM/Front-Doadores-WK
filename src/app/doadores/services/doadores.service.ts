import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class DoadoresService {
  constructor(private http: HttpClient) {}

  public contagemPorEstado() {
    return this.http.get('http://localhost:8080/api/contagem-por-estado');
  }

  public percentualObesosSexo() {
    return this.http.get('http://localhost:8080/api/percentual-obesos-sexo');
  }

  public MediaIdadeTipoSanguineo() {
    return this.http.get('http://localhost:8080/api/media-idade-tipo-sanguineo');
  }

  public doadorReceptor() {
    return this.http.get('http://localhost:8080/api/doador-recptor');
  }

  public PercentualImcFaixa() {
    return this.http.get('http://localhost:8080/api/percentual-imc-faixa');
  }
}
