import OtpTemplate from "./templates/OtpTemplate";

export const getTemplate = (name: string, payload: any) => {
    switch (name) {
        case 'otp':
            return OtpTemplate(payload)

        default:
            return OtpTemplate(payload)

    }
}