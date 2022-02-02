const conn = require("./db");

module.exports = {

    dashbord() {
        return new Promise((resolve, reject) => {

            conn.query(`
                SELECT
                    (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,
                    (SELECT COUNT(*) FROM tb_menus) AS nrmenus,
                    (SELECT COUNT(*) FROM tb_reservations) AS nrreservations,
                    (SELECT COUNT(*) FROM tb_users) AS nrusers;
            `, (err, results) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }

            });

        });
    },

    getParams(req, params) {

        return Object.assign({}, {
            menus: req.menus,
            user: req.session.user
        }, params);

    },

    getMenus(req) {

        let menus = [{
                text: "Tela Inicial",
                href: "/admin/",
                icon: "home",
                active: false,
            },
            {
                text: "Menu",
                href: "menus",
                icon: "cutlery",
                active: false,
            },
            {
                text: "Reservas",
                href: "reservations",
                icon: "calendar-check-o",
                active: false,
            },
            {
                text: "Contatos",
                href: "contacts",
                icon: "comments",
                active: false,
            },
            {
                text: "Usuários",
                href: "users",
                icon: "users",
                active: false,
            },
            {
                text: "E-mails",
                href: "emails",
                icon: "envelope",
                active: false,
            },
        ];

        menus.map(menu => {
            console.log(menu.href, req.url);
            if (`/${menu.href}` === req.url) menu.active = true;
            if (req.url === "/") menus[0].active = true;
        });

        return menus;
    }
}