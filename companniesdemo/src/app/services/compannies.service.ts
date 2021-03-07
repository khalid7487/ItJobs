import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompanniesService {
 
  private baseUrl="https://it-jobs.fractalslab.com/api/companies?";
  private baseUrl1="https://it-jobs.fractalslab.com/api/valid-tags";

  //_start=1&_limit=${this.pagelimit}&stacks=python&stacks=django`;

  constructor(private httpClient: HttpClient) { }

  getCompannies(startPage, pagelimit): Observable<any>{
    console.log(this.baseUrl);
    return this.httpClient.get(this.baseUrl+`_start=${startPage}` +`&_limit=${pagelimit}`);
}
 
postCompany(nextstart, newpage){
  return this.httpClient.get(this.baseUrl + `_start=${nextstart}` + `&_limit=${newpage}`);
}

getValidStack(): Observable<any>{
  return this.httpClient.get(this.baseUrl1);
}

getCompaniesByStacks(stack): Observable<any>{
  return this.httpClient.get(this.baseUrl+`_start=1&_limit=10&`+ `stacks=${stack}`);
}

getcompanyBytwoStacks(stack1, stack2): Observable<any>{
  return this.httpClient.get(this.baseUrl+`_start=1&_limit=10&`+ `stacks=${stack1}&stacks=${stack2}`);
}
getcompanyBythreeStacks(stack1, stack2, stack3): Observable<any>{
  return this.httpClient.get(this.baseUrl+`_start=1&_limit=10&`+ `stacks=${stack1}&stacks=${stack2}&stacks=${stack3}`);
}

getcompanyByFourStacks(stack1, stack2, stack3,stack4): Observable<any>{
  return this.httpClient.get(this.baseUrl+`_start=1&_limit=10&`+ `stacks=${stack1}&stacks=${stack2}&stacks=${stack3}&stacks=${stack4}`);
}

}