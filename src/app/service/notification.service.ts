import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs"; // Import BehaviorSubject and Observable from RxJS

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private successMessageSubject = new BehaviorSubject<string>('');

  getSuccessMessage(): Observable<string> {
    return this.successMessageSubject.asObservable();
  }

  showSuccess(message: string) {
    console.log(this.successMessageSubject, "success message")
    this.successMessageSubject.next(message);
    // Optionally, you can set a timeout to hide the message after a certain duration.
    setTimeout(() => {
      this.successMessageSubject.next('');
    }, 2000); // Hide the message after 3 seconds (adjust as needed)
  }
}
