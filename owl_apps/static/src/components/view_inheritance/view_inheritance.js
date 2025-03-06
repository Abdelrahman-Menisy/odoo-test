/* @odoo-module */

import { registry } from "@web/core/registry";
import { ListView } from "@web/views/list/list_view";
import { useService } from "@web/core/utils/hooks";
import { ListView } from "@web/views/list/list_view/list_view"; // Correct import path

class ResPartnerListController extends ListView.Controller {
    setup() {
        super.setup();
        console.log("ResPartnerListView setup");

        // Correctly initialize the action service
        this.actionService = useService("action");
    }

    openSaleOrders() {
        if (this.actionService) {
            this.actionService.doAction({
                type: "ir.actions.act_window",
                name: "Customer Sale Orders",
                res_model: "sale.order",
                views: [[false, "list"], [false, "form"]],
            });
        } else {
            console.error("Action service is not available.");
        }
    }
}

export const ResPartnerListView = {
    ...ListView,
    Controller: ResPartnerListController, // Corrected capitalization
    buttonTemplate: "owl.respartnerinherit.Buttons",
};

registry.category("views").add("res_partner_list_view", ResPartnerListView);
