from odoo import models, fields, api


class SaleOrderLine(models.Model):
    _inherit = 'sale.order.line'

    lot_id = fields.Many2one(
        'stock.lot',
        string='Lot/Serial Number',
        help='Select the lot or serial number for this product.',
    )

    @api.onchange('lot_id')
    def _onchange_lot_id(self):
        for line in self:
            if line.lot_id:
                line.product_id = line.lot_id.product_id
                
                