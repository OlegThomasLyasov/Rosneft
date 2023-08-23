export const resize = {
    mounted(el: any, binding: { value: (arg0: any, arg1: any) => any; }) {
        const f = (evt: any) => {
            if (binding.value(evt, el)) {
                window.removeEventListener('resize', f);
            }
        };
        window.addEventListener('resize', f);
    },
    unmounted(el: any, binding: any) {
        window.removeEventListener('resize', binding.f);
    },
    name: 'resize',
};

export default {
    resize,
};