/* @odoo-module **/

import { registry } from "@web/core/registry";
import { listView } from "@web/views/list/list_view";
import { listController } from "@web/views/list/list_controller";
import { useService } from "@web/core/utils/hooks";

class ResPartnerListController extends listView {
    setup() {
        super.setup();
        console.log("ResPartnerListView setup");
        this.action = useService("action");
    }

    openSaleOrders() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "customer sale orders",
            res_model: "sale.order",
            views: [[false, "list"], [false, "form"]],
        });
    }
}

export const ResPartnerListView = {
    ...listView,
    controller: ResPartnerListController,
    buttonTemplate: "owl.respartnerinherit.Buttons",
}

registry.category("views").add("res_partner_list_view", ResPartnerListView);