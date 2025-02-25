/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { useBus } from "@web/core/utils/hooks";

export class OrderNotification extends Component {
    setup() {
        this.state = useState({ visible: false, message: "" });

        // Listen for new sale order events
        useBus(this.env.services.bus_service, "new_sale_order", (orderData) => {
            this.state.message = `New Sale Order Confirmed: ${orderData.name}`;
            this.state.visible = true;
        
            setTimeout(() => {
                this.state.visible = false;
            }, 5000);
        });

}

OrderNotification.template = "sale_order_notification.OrderNotification";
