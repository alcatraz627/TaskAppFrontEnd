import React from 'react'
import { connect } from 'react-redux'
import { createAction, ACTION_TYPES } from '../../constants/actions'

function Notif({ notifList, dismissNotif }) {

    return <div className="notifContainer" align="right">
        {Object.values(notifList).map(({ message, type, id }) => (
            <div key={id} className={`notifBar visible ${type.toLowerCase()}`}>
                {message}
                <div className="grow"></div>
                <i className="fa fa-times" onClick={() => dismissNotif(id)} />
            </div>))}
        {/* <div className="notifBar">Message One</div>
        <div className="notifBar">Message Two</div> */}
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    notifList: state.utils.notifList,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    dismissNotif: id => dispatch(createAction(ACTION_TYPES.DISMISS_NOTIF, { id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notif)