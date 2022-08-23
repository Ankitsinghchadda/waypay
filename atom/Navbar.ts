import { atom } from 'recoil'

export const NavbarState = atom<boolean>({
	key: 'NavbarState',
	default: false,
})
