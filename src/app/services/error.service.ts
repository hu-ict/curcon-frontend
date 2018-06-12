import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
export class ErrorService {
   handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  log(x){
    console.log(x);
  }
}
