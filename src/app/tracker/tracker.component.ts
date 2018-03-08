import { Component } from "@angular/core";
// import { TrackerConst } from "./tracker-const";

@Component({
    selector: "tracker",
    templateUrl: "./tracker.component.html"
})
export class Tracker {
    requestor = "thai";
    stages = stages;
    data = {
        evaluationId:'123456',
        status: "Draft",
        lastUpdated: Date.now(),
        san: "123456789",
        logs:[
            {message: `Requestor ${this.requestor} created draft`, updatedDate: Date.now()}
        ],
    }

    do(action){
        action.func(this.requestor, this.data);
        console.log("action: ", this.data, this.stages[this.data.status]);
    }
}

var stages = {
    Draft: {
        layout: {
            detail: {
                name:"Draft",                
                pos: 1,
                direction: 0,
                warning: false,
                disabled: false
            },
            evaluation: {
                state: "Draft",
                small: false,
                direction: 0,
                warning: false,
                disabled: false
            },
            owner: {
                state: "Draft",
                small: false,
                direction: 0,
                warning: false,
                disabled: false
            },
            approval: {
                state: "NotStarted",
                small: true,
                direction: 0,
                warning: false,
                disabled: true
            },
            final: {
                state: "NotStarted",
                small: true,
                direction: 0,
                warning: false,
                disabled: true
            },
        },
        actions: [
            {
                name: "Submit", func: (requestor, data) => {
                    data.status = "DraftSubmitted";
                    log(data, `Requestor ${requestor} submitted draft`);
                }
            }
        ]
    },
    DraftSubmitted: {
        layout: {
            detail: {
                name:"Draft - Submitted for Review",                        
                pos: 1,
                direction: 1,
                warning: false,
                disabled: false
            },
            evaluation: {
                state: "InProgress",
                small: false,
                direction: 0,
                warning: false,
                disabled: false
            },
            owner: {
                state: "InProgress",
                small: false,
                direction: 1,
                warning: false,
                disabled: false
            },
            approval: {
                state: "NotStarted",
                small: true,
                direction: 0,
                warning: false,
                disabled: true
            },
            final: {
                state: "NotStarted",
                small: true,
                direction: 0,
                warning: false,
                disabled: true
            },
        },
        actions: [
            {
                name: "Approver return", func: (requestor, data) => {
                    data.status = "DraftReturned";
                    log(data, "Approver returned draft");
                }
            }
        ]
    }, 
    DraftReturned: {
        layout: {
            detail: {
                name:"Draft - Returned for revision",                                
                pos: 2,
                direction: 0,
                warning: true,
                disabled: false
            },
            evaluation: {
                state: "InProgress",
                small: false,
                direction: 0,
                warning: true,
                disabled: false
            },
            owner: {
                state: "InProgress",
                small: false,
                direction: -1,
                warning: true,
                disabled: false
            },
            approval: {
                state: "InProgress",
                small: false,
                direction: -1,
                warning: true,
                disabled: false
            },
            final: {
                state: "NotStarted",
                small: true,
                direction: 0,
                warning: false,
                disabled: true
            },
        },
        actions: [
            {
                name: "Approver has initiated Change mode", func: (requestor, data) => {
                    data.status = "PendingApprovalChanged";
                    log(data, "Approver initiated Change mode");
                }
            }
        ]
    },
    PendingApprovalChanged: {
        layout: {
            detail: {
                name:"Pending Approval - Changed",                                
                pos: 3,
                direction: 0,
                warning: false,
                disabled: false
            },
            evaluation: {
                state: "Completed",
                small: true,
                direction: 0,
                warning: false,
                disabled: false
            },
            owner: {
                state: "Completed",
                small: true,
                direction: 0,
                warning: false,
                disabled: false
            },
            approval: {
                state: "InProgress",
                small: false,
                direction: 0,
                warning: true,
                disabled: false
            },
            final: {
                state: "NotStarted",
                small: false,
                direction: 0,
                warning: false,
                disabled: false
            },
        },
        actions: [
            {
                name: "Approver has initiated Change mode", func: (requestor, data) => {
                    data.status = "PendingApprovalChanged";
                    log(data, "Approver initiated Change mode");
                }
            }
        ]
    }               
}

function log(data, msg){
    data.updatedDate = Date.now();
    data.logs.push({message:msg, updatedDate: Date.now()});
}