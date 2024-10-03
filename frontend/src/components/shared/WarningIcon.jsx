import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function WarningIcon() {
    return (
        <div data-testid="warning-icon">
            < FontAwesomeIcon data-testid="font-awesome-icon" icon={faExclamationTriangle} beat style={{ color: "#ef4444", }} />
        </div>

    )
}
