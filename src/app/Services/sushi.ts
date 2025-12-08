import { Injectable } from '@angular/core';
import { Box } from '../Models/iboxes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Sushi {
  //L'attribut ontenant l'Api
  private apiUrl:string="http://localhost/API_Dataviz/sushi_box/api/boxes/index.php"
  
  // On a accès au service en l'injectant dans le constructeur , dans l'attribut http
  constructor(private http : HttpClient){}
  //On recupère les boxes
  getBoxes():Observable<Box[]>{
    return this.http.get<Box[]>(this.apiUrl);
  }
}
