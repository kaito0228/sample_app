import React, {Component} from "react"
import PropTypes from "prop-types"
import classnames from 'classnames'

export default class FollowButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            relationship: props.relationship
        }
    }

    follow = () => {
        this.setState({
            loading: true
        })

        $.ajax({
            type: 'POST',
            url: `/relationships`,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                followed_id: this.props.user.id
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
            }
        }).then((response) => {
            const relationship = response
            this.setState({
                loading: false,
                relationship
            })
        })
    }

    unfollow = () => {
        this.setState({
            loading: true
        })

        $.ajax({
            type: 'DELETE',
            url: `/relationships/${this.state.relationship.id}`,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
            }
        }).then((response) => {
            this.setState({
                loading: false,
                relationship: null
            })
        })
    }

    render() {
        const isFollowing = this.state.relationship !== null
        const className = classnames('btn', {
            'btn-danger': isFollowing,
            'btn-primary': !isFollowing
        })

        return (
            <button
                className={className}
                onClick={isFollowing ? this.unfollow : this.follow}
                disabled={this.state.loading}
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
        )
    }
}

FollowButton.defaultProps = {
    relationship: null
}

FollowButton.propTypes = {
    user: PropTypes.object.isRequired,
    relationship: PropTypes.object
}
