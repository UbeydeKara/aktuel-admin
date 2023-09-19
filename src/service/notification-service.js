import http from "./http-common";

const serviceUrl = "/notification"

const pushNotification = (message) => {
    return http.post(serviceUrl, message);
}

const NotificationService = {
    pushNotification
};

export default NotificationService;
