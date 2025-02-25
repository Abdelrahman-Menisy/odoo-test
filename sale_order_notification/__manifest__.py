{
    "name": "Sale Order Notification",
    "summary": "Shows real-time notifications when a sale order is confirmed",
    "author": "Menisy",
    "version": "1.0",
    "depends": ["base", "sale", "bus", "web"],
    "data": [
        "views/assets.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "sale_order_notification/static/src/components/OrderNotification.js",
            "sale_order_notification/static/src/xml/order_notification.xml",
            "sale_order_notification/static/src/css/order_notification.css",
        ],
    },
    "installable": True,
    "application": True,
}
