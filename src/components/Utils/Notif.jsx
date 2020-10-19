import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createAction, ACTION_TYPES } from '../../constants/actions'

import Pusher from 'pusher-js';
Pusher.logToConsole = true;

const pusher = new Pusher('22b4002e02b4fa704cb1', {
    cluster: 'ap2'
});

function Notif({ notifList, dismissNotif, pushNotif, isLoggedIn, userId, redir }) {

    useEffect(() => {
        let channel;
        if (isLoggedIn) {
            channel = pusher.subscribe(`channelForUser${userId}`);
            // console.log("Subscribed!", pusher)

            channel.bind('listenerEvent', function (data) {
                // console.log(data)
                try {
                    // JSON.parse(data)
                    pushNotif(data)
                } catch (error) {
                    console.log("Error displaying notification", error)
                }
            });
        } else {
            if (channel) {
                channel.unsubscribe()
                // console.log("Unsubscribed!")
            }
        }

    }, [isLoggedIn])

    const handleClick = (link) => {
        if (link) {
            redir(link)
        }
    }

    return <div className="notifContainer" align="right">
        {Object.values(notifList).map(({ message, type, id, timestamp, link }) => (
            <div key={id} className={`notifBar visible ${type.toLowerCase()} ${!!link?'pointer':''}`} onClick={() => handleClick(link)}>
                {message} <br /> [{timestamp}]
                <div className="grow"></div>
                <i className="fa fa-times" onClick={() => dismissNotif(id)} />
            </div>))}
    </div>
}

const mapStateToProps = (state, ownProps) => ({
    notifList: state.utils.notifList,
    isLoggedIn: !!state.user.token,
    userId: state.user.id,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    dismissNotif: id => dispatch(createAction(ACTION_TYPES.DISMISS_NOTIF, { id })),
    pushNotif: data => dispatch(createAction(ACTION_TYPES.PUSH_NOTIF, data)),
    redir: link => dispatch(push(link)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notif)