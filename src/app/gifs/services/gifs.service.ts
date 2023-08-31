import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

// const GIPHY_API_KEY = 'dpamGsEb64CXD8fS34GKaH2FF4LgXzrI'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = []

  private _tagHistory: string[] = [];
  private apiKey:     string = 'dpamGsEb64CXD8fS34GKaH2FF4LgXzrI'
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor( private http: HttpClient ) { }




  get tagHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase()

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagHistory.unshift( tag );

    this._tagHistory = this._tagHistory.splice(0,10);

  }


  searchTag( tag: string):void {

    if ( tag.length === 0 ) return;
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe( resp => {

        this.gifList = resp.data;

        console.log({gifs : this.gifList});

      })


    // fetch('https://api.giphy.com/v1/gifs/search?api_key=dpamGsEb64CXD8fS34GKaH2FF4LgXzrI&q=valorant&limit=10')
    //   .then(resp => resp.json() )
    //   .then( data => console.log(data));
  }

}