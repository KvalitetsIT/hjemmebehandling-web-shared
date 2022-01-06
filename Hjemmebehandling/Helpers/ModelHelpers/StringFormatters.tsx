export class StringFormatter {

    static FormatCpr(cpr? : string) {
        if (!cpr)
            return "";
        return cpr.slice(0, 6) + "-" + cpr.slice(6)
    }

}
