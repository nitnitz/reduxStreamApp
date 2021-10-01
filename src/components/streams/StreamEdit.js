import React from 'react';
import { fetchStream, editStream } from '../../actions';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onEditSubmit = (initialValues) => {
    this.props.editStream(this.props.match.params.id, initialValues);
  };

  render() {
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          onSubmit={this.onEditSubmit}
          initialValues={_.pick(this.props.stream, 'title', 'description')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);