// import Toast from 'react-native-root-toast';

function showMsg(msg, option) {
    if (!msg) {
        return;
    }
    return alert(msg)
}

function hideMsg(toast) {
    //Toast.hide(toast);
}

export default {
    showMsg,
    hideMsg
}