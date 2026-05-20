import styles from "./InfoPanel.module.scss"
import React from "react"
import type { InfoPanelProps } from "./InfoPanel.types"

export const InfoPanel: React.FC<InfoPanelProps> = ({ 
    h1Text,
    pText,
    listItems
 }) => {
    return (
        <div className={`${styles.panel} ${styles.infoPanel}`}>
            <h1>{h1Text}</h1>
            <p>{pText}</p>
            <ul>
                {listItems?.map((item, index) => (
                    <li key={index}>
                        <span className={styles.iconCircle}>
                            {
                                item.type === 'number' 
                                ? 
                                <span className={styles.number}>{item.icon}</span>
                                : 
                                item.icon
                            }
                        </span>
                        {
                            typeof item.text === 'string'
                            ?
                            <p>{item.text}</p>
                            :
                            <div>
                                <h3>{item.text.h3Text}</h3>
                                <p>{item.text.pText}</p>
                            </div>
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}