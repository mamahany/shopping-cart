import styles from './Loader.module.css'
export default function Loader({loaderStyle}){
    return(
    <div className={styles.container} style={loaderStyle}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
    </div>
    )
}