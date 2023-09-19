import {showAlert} from "./AlertAction";
import NotificationService from "../../service/notification-service";

export const pushNotification = (message) => async (dispatch) => {
    try {
        const res = await NotificationService.pushNotification(message);
        dispatch(showAlert(
            "success",
            "Bildirimler Gönderildi",
            "Bildirimler tüm kullanıcılara başarıyla ulaştırıldı"));
        return Promise.resolve(res.data.data);
    } catch (err) {
        dispatch(showAlert(
            "error",
            "Bildirimler Gönderilemedi",
            "Bildirimler gönderilirken bir hata oluştu"));
        return Promise.reject(err)
    }
}
