import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { RepoEntity } from './repo-entity';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';


interface IServerResponse {
  items: string[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //package object - for push data while server return a response
  public packageData: BehaviorSubject<RepoEntity[]> = new BehaviorSubject<RepoEntity[]>(null);

  itemsPerPage: number = 15;
  total_items: number;

  constructor(private http: HttpClient) { }

  findRepositories(term, page) {

    //set query string params
    let params = new HttpParams().set("q", term)
      .set("page", page)
      .set("per_page", this.itemsPerPage.toString());

      //call to GIT api
    this.http.get(environment.gitAPI, { params: params }).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)).subscribe((res) => {
        
        //save paging details, and map result items to RepoEntity object
        this.total_items = res["total_count"];
        let arr: RepoEntity[] = new Array();
        arr = res["items"].map(item => new RepoEntity(item.name, item.url, item.owner.avatar_url, item.owner.id, item.description, item.id));
        
        //push data to packageData, this will rise all 'subscribe()' calling
        this.packageData.next(arr);
      });
  }

  bookmarkMe(item: RepoEntity): Observable<any> {
    let _headers = new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded; charset=UTF-8")
    .set("Access-Control-Allow-Origin","*")
    .set("Access-Control-Allow-Methods","GET, POST, DELETE, PUT");
    // _headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    // _headers['Access-Control-Allow-Origin'] = '*';
    // _headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, PUT';

    let request = { item: JSON.stringify(item) };

    return this.http.post(environment.bookmarksAPI + "/api/sessionstorage/save", this.encodeUrlParams(request), { headers: _headers, withCredentials: true });
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error occured. pls try again later..');
  }

  //encoded params that sending to server
  //on server side will get it in POST method as [FormBody] paramter
  public encodeUrlParams(data) {
    var body = new HttpParams();
    _.forEach(data, (value, key) => {
      body = body.append(key, value)

    })
    return body;
  }

}
