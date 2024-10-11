import styles from './welcome.module.css'

export default function Welcome() {
    return <div className={styles.welcomeContainer}>
        <p className={styles.welcomeText}>Welcome to <span className={styles.logoName}>RecipeSaga</span>, Your Culinary Adventure Awaits!</p>
        <p className={styles.welcomeSubText}>Embark on a delicious journey with RecipeSaga, where every meal is an opportunity to create something extraordinary. Our vast collection of recipes is just waiting to inspire your next culinary masterpiece!</p>
    </div>
}