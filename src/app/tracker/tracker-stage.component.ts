import { Component, Renderer, ElementRef, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector:"tracker-stage",
    templateUrl: "./tracker-stage.component.html"
})
export class TrackerStage implements OnInit, OnChanges{
    
    cssClasses = {
        Draft: "state-draft",
        NotStarted: "state-not-started",
        InProgress: "state-in-progress",
        Completed: "state-completed",
        Denied: "state-denied",
        Parked: "state-parked",
    };

    @Input() info = {
        state: "Draft",
        small: false,
        direction: 0,
        warning: false,
        disabled: false
    };
    @Input() label = "";

    constructor(private renderer: Renderer, private el: ElementRef){

    }

    ngOnInit(){
        this.refresh();
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.refresh();
    }    

    reset(){
        for(let cssClass of Object.values(this.cssClasses)){
            this.renderer.setElementClass(this.el.nativeElement, cssClass, false);    
        }
        this.renderer.setElementClass(this.el.nativeElement, "left", false);        
        this.renderer.setElementClass(this.el.nativeElement, "small", false);
        this.renderer.setElementClass(this.el.nativeElement, "left-forward", false);
        this.renderer.setElementClass(this.el.nativeElement, "left-backward", false);
        this.renderer.setElementClass(this.el.nativeElement, "warning", false);
        this.renderer.setElementClass(this.el.nativeElement, "disabled", false);
    }
    

    refresh(){
        this.reset();
        this.renderer.setElementClass(this.el.nativeElement, this.cssClasses[this.info.state], true);
        this.renderer.setElementClass(this.el.nativeElement, "left", true);        
        this.renderer.setElementClass(this.el.nativeElement, "small", this.info.small);
        this.renderer.setElementClass(this.el.nativeElement, "left-forward", this.info.direction === 1);
        this.renderer.setElementClass(this.el.nativeElement, "left-backward", this.info.direction === -1);
        this.renderer.setElementClass(this.el.nativeElement, "warning", this.info.warning);
        this.renderer.setElementClass(this.el.nativeElement, "disabled", this.info.disabled);
    }
}