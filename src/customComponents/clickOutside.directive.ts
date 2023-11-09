import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from "@angular/core";
import { Subscription, filter, fromEvent } from "rxjs";

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy{

    @Output() clickOutside = new EventEmitter<void>();

    documentClickSubcription : Subscription | undefined;

    constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document){}

    ngAfterViewInit(): void {
        this.documentClickSubcription = fromEvent(this.document, 'click').pipe(
            filter((event) => {
            return !this.isInside(event.target as HTMLElement);
        })
        ).subscribe(() => {
            this.clickOutside.emit();
        })
    }

    ngOnDestroy(): void {
        this.documentClickSubcription?.unsubscribe();
    }

    isInside(elementToCheck: HTMLElement): boolean {
        return elementToCheck === this.element.nativeElement || this.element.nativeElement.contains(elementToCheck);
    }
}