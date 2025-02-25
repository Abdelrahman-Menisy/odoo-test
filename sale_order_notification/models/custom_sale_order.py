from odoo import models, api

class SaleOrder(models.Model):
    _inherit = "sale.order"

    def action_confirm(self):
        res = super(SaleOrder, self).action_confirm()

        # Send event to frontend
        self.env["bus.bus"]._sendone(
            "new_sale_order_channel",
            "new_sale_order",
            {"name": self.name, "id": self.id},
        )

        return res
