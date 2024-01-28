import { Component } from '@angular/core';

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.css']
})
export class UserLandingPageComponent {
    title = 'Alumni_Space_UI';
    isWhotoFollow: boolean = false;
    toggleFollowers(){
        this.isWhotoFollow = !this.isWhotoFollow;
      }
}
const storedTheme: string | null = localStorage.getItem('theme')

const getPreferredTheme = (): string => {
    if (storedTheme) {
        return storedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const setTheme = (theme: string): void => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
    }
}

setTheme(getPreferredTheme())

window.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.theme-icon-active');
  if (el !== null) {
      // Some code here
        const showActiveTheme = (theme: string): void => {
            const activeThemeIcon = document.querySelector('.theme-icon-active use')
            const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
            const svgOfActiveBtn = btnToActive?.querySelector('.mode-switch use')?.getAttribute('href')

            document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
                element.classList.remove('active')
            })

            btnToActive?.classList.add('active')
            if (activeThemeIcon && svgOfActiveBtn) {
                activeThemeIcon.setAttribute('href', svgOfActiveBtn)
            }
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          if (storedTheme !== 'light' && storedTheme !== 'dark') {
              setTheme(getPreferredTheme())
          }
      })
        showActiveTheme(getPreferredTheme())

        document.querySelectorAll<HTMLElement>('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value')
                    if (theme) {
                        localStorage.setItem('theme', theme)
                        setTheme(theme)
                        showActiveTheme(theme)
                    }
                })
            })
    }
})
