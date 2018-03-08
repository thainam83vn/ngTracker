import { Component, OnInit, Input, Renderer, ElementRef, SimpleChanges, OnChanges } from "@angular/core";

@Component({
    selector:"tracker-detail",
    templateUrl: "./tracker-detail.component.html"
})
export class TrackerDetail implements OnInit, OnChanges{
    cssClasses = {
        Draft: "state-draft",
        NotStarted: "state-not-started",
        InProgress: "state-in-progress",
        Completed: "state-completed",
        Denied: "state-denied",
        Parked: "state-parked",
    };
    @Input() data;
    @Input() info = {
        direction: 0,
        warning: false
    };

    constructor(private renderer: Renderer, private el: ElementRef){

    }

    ngOnInit(){
        this.refresh();
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.refresh();

        this.renderer.setElementProperty(document, "onclick", (e)=>{
            console.log(e);
            if (!(this.insideClass(e.target, 'popup-logs')
            || e.target.className === 'see-more-text'
            )){
                this.renderer.setElementClass(this.el.nativeElement, "see-more", false);        
            }
        });
    }  

    insideClass(node, className){
        if (node.className === className)
            return true;
        if (node.parentNode)
            return this.insideClass(node.parentNode, className);
        return false;
    }

    refresh(){
        this.renderer.setElementClass(this.el.nativeElement, "content-box-container", true);
        this.renderer.setElementClass(this.el.nativeElement, "left", true);
        this.renderer.setElementClass(this.el.nativeElement, "left-forward", this.info.direction === 1);
        this.renderer.setElementClass(this.el.nativeElement, "left-backward", this.info.direction === -1);
        this.renderer.setElementClass(this.el.nativeElement, "warning", this.info.warning);
    }

    showSeeMore(){
        this.renderer.setElementClass(this.el.nativeElement, "see-more", true);        
    }
}