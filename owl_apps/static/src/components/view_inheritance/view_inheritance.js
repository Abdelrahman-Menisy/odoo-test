/* @odoo-module **/

import { registry } from "@web/core/registry";
import { ListView } from "@web/views/list/list_view"; // Import ListView (uppercase 'L')
import { ListController } from "@web/views/list/list_controller"; // Import ListController (uppercase 'L')
import { useService } from "@web/core/utils/hooks";

class ResPartnerListController extends ListController {
    setup() {
        super.setup();
        console.log("ResPartnerListView setup");
        this.action = useService("action");
    }

    openSaleOrders() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Customer Sale Orders",
            res_model: "sale.order",
            views: [[false, "list"], [false, "form"]],
        });
    }
}

export const ResPartnerListView = {
    ...ListView, // Use ListView, not listView
    Controller: ResPartnerListController, // 'Controller' should be capitalized
    buttonTemplate: "owl.respartnerinherit.Buttons",
}

registry.category("views").add("res_partner_list_view", ResPartnerListView);
