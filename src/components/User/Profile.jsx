import React from 'react'

import { connect } from 'react-redux'

import { ROLES } from '../../constants'

function Profile({ userList, id, userId }) {
    // if(id == 'me')
    let user;
    const idToGet = parseInt((id == 'me') ? userId : id)
    if (!Object.keys(userList).includes(idToGet.toString())) {
        // TODO: Make a request to try to fetch the user & show Loading...
        // TODO: Redirect -> 404
        return <div>Not found</div>
    } else {
        user = userList[idToGet]
    }
    return (
        <div className="userProfileContainer">
            <div className="userProfileSidebar">
                <img className="profilePic" />
                <h5 className="userName">{user.name}</h5>
                <div className="userEmail"><i className="fa fa-envelope"></i> {user.email}</div>
                {user.role == ROLES.ADMIN && <div className="userRole">{user.role}</div>}
            </div>
            <div className="userProfileDashboard">
                <div className="taskPanel">
                    <h5>Task Panel</h5>
                    <hr/>
                    <div className="detailedList">
                        <div className="detailedListItemContainer">
                            <div className="textPrimary">Task Primary</div>
                            <div className="textSecondary">Task Secondary</div>
                        </div>
                        <div className="detailedListItemContainer">
                            <div className="textPrimary">Task Primary</div>
                            <div className="textSecondary">Task Secondary</div>
                        </div>
                        <div className="detailedListItemContainer">
                            <div className="textPrimary">Task Primary</div>
                            <div className="textSecondary">Task Secondary</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.match.params.id,
    userList: state.user.userList,
    userId: state.user.id
})

export default connect(mapStateToProps)(Profile);