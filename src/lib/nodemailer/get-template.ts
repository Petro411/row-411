import ContactTemplate from "./templates/ContactTemplate";
import OtpTemplate from "./templates/OtpTemplate";

export const getTemplate = (name: string, payload: any) => {
    switch (name) {
        case 'otp':
            return OtpTemplate(payload)

        case 'contact':
            return ContactTemplate(payload)

        default:
            return OtpTemplate(payload)

    }
}