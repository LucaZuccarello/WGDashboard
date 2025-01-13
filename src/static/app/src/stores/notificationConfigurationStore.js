import {defineStore} from "pinia";


export const NotificationConfigurationsStore = defineStore('NotificationConfigurationsStore', {
    state: () => ({
        Services: [
            {
                display: "DISCORD",
                name: "discord",
                dataRequired: [
                    {display: "WebhookID", value: ""}, 
                    {display: "WebhookToken", value: ""}
                ]
            },
            {
                display: "TELEGRAM",
                name: "telegram",
                dataRequired: [
                    {display: "ChatID", value: ""}, 
                    {display: "BotToken", value: ""}
                ]
            },
        ],
        Tags: [
            {
                display: "INFO",
                name: "info"
            },
            {
                display: "ERROR",
                name: "error"
            },
            {
                display: "DEBUG",
                name: "debug"
            },
        ]

    }),
})