import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { auth } from '../model/auth';

@Injectable({
	providedIn: 'root'
})
export class BaseService {
	private barMessageEmiter = new EventEmitter();
	private lastNavigationAction: string;
	
	private subject = new Subject<any>();  

	constructor(private router: Router) {
		router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				this.lastNavigationAction = event.navigationTrigger;
			}
		});
	}

	public notifyMessage(message) {
		this.barMessageEmiter.emit(message);
	}

	public clearMessage() {
		this.barMessageEmiter.emit({ message: null, type: null });
	}

	public subscribeMessage(generatorOrNext?, error?, complete?) {
		this.barMessageEmiter.subscribe(generatorOrNext, error, complete);
	}

	public isBack() {
		return this.lastNavigationAction == "popstate";
	}

	public confirm(message: string, yesFn: () => void, noFn?: () => void) {
		let that = this;
		this.subject.next({
			type: "confirm",
			text: message,
			yesFn:
				function() {
					that.subject.next();
					yesFn();
				},
			noFn: function() {
				that.subject.next();
				if (noFn) {
					noFn();
				}
			}
		});
	}

	public alert(message: string, noFn?: () => void) {
		let that = this;
		this.subject.next({
			type: "alert",
			text: message,
			noFn: function() {
				that.subject.next();
				if (noFn) {
					noFn();
				}
			}
		});
	}

	public getMessage(): Observable<any> {
		return this.subject.asObservable();
	}

	public hasPermission(perm: string): boolean {
		return auth.roles.includes(perm);
	}
}
