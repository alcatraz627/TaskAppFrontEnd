import React, { Component } from 'react'
import { connect } from 'react-redux'

const ForgotPass = (props) => {
    return (
        <div className="container">
            {JSON.stringify(props.match)}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass)
