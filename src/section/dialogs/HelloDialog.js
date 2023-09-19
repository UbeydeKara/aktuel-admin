import {ModalTransition} from "../../utils/ModalTransition";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {ReactComponent as Vector} from '../../asset/new.svg';
import ListItemIcon from "@mui/material/ListItemIcon";
import {GridView, NotificationsNone, Visibility} from "@mui/icons-material";
import useLocalStorage from "../../hook/useLocalStorage";

export default function HelloDialog() {
    const [opened, setOpened] = useLocalStorage("dialogOpened");

    return(
        <Dialog open={!Boolean(opened)} TransitionComponent={ModalTransition}
                PaperProps={{sx: {
                    background: "linear-gradient(133deg, rgb(91 139 228 / 40%), rgb(0 81 167 / 8%)) rgb(255, 255, 255)",
                    borderRadius: "32px !important"}}} fullWidth maxWidth="lg">
            <DialogContent sx={{pb: 0}}>
                <Stack pl={2} direction={{xs: "column", sm: "row"}}>
                    <Box color="#060d29">
                        <Typography variant="h4" gutterBottom>Aktüel Dashboard Tam Sürüme Kavuştu!</Typography>
                        <Typography variant="body1" gutterBottom>Aktüel Dashboard artık test sürümünden tam sürüme geçiş yaptı.
                        Aşağıda yeni eklenen özellikleri sizler için derledik:</Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <NotificationsNone />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Kullanıcılara bildirim gönderebileceksiniz"
                                    secondary="İsterseniz katalog eklendiğinde otomatik bildirim gönderebilir veya istediğiniz zaman istediğiniz mesajı kullanıcılara bildirebilirsiniz."/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Visibility />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Görsel ve performans iyileştirmelerinin tadını çıkarın"
                                    secondary="Pamuk gibi yumuşacık animasyonlar... tavada eriyen tereyağ gibi kayan pencereler... sanki rüya gibi."/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <GridView />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Daha fazla özelliği keşfedin"
                                    secondary="Market düzenleme, akıllı bildirimler, otomatik kullanıcı oturum mekanizması... daha birçok keşfedilmeyi bekleyen özellik var!"/>
                            </ListItem>
                        </List>
                    </Box>
                    <Vector style={{maxWidth: 450}}/>
                </Stack>
            </DialogContent>
            <DialogActions sx={{alignItems: "flex-end", pt: "0 !important"}}>
                <Button variant="contained" onClick={() => setOpened(true)}>Yuppiii!</Button>
            </DialogActions>
        </Dialog>
    );
};
