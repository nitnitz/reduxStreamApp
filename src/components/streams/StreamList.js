import React from 'react';
import { fetchStreams } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderUpdate = (stream) => {
    return (
      <div className="right floated content">
        <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
          Edit
        </Link>
        <Link
          to={`/streams/delete/${stream.id}`}
          className="ui button negative"
        >
          Delete
        </Link>
      </div>
    );
  };

  renderList = ({ streams, currentUserId }) => {
    return streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {stream.userId === currentUserId ? this.renderUpdate(stream) : null}
          <i className="video icon large" />
          <div className="content">
            <Link className="header" to={`/streams/${stream.id}`}>
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  renderCreate = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui primary button">
            Create
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <>
        <div className="ui celled list">{this.renderList(this.props)}</div>
        {this.renderCreate()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);