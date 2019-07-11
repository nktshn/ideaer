export namespace StringUtils {

    export function cutFileNameExtention(name: string): string {
        const res = name.split('.');
        res.pop();
        return res.join('.');
    }
}
