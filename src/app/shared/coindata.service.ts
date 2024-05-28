import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable()
export class coinDataService {
  constructor(private http: HttpClient) {}
  coinDataHeader = new HttpHeaders({
    'X-RapidAPI-Key': '76e3478958msh3514934cebda9d6p14d4ccjsna7d2e232769f',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  });
  coinDataParams = { referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h' };
  getCoinData(id: string) {
    return this.http.get(`https://coinranking1.p.rapidapi.com/coin/${id}`, {
      headers: this.coinDataHeader,
      params: this.coinDataParams,
    });
  }
}
