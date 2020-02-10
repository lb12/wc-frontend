import React from "react";

export default class Tags extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTags();
  }

  renderTags = tags => {
    return tags.map(tag => (
      <option key={tag} value={tag}>
        {tag}
      </option>
    ));
  };

  onChange = evt => {
    const selectedIndex = evt.target.selectedIndex - 1; // Descontar el 'Select a tag'
    const selectedTag = this.props.tags[selectedIndex];

    this.props.onTagSelected(selectedTag);
  };

  onMultipleChange = evt => {
    let selectedTags = [...evt.target.options]
      .filter(options => options.selected)
      .map(option => option.value);
    this.props.onTagSelected(selectedTags);
  };

  render() {
    const { tags } = this.props;
    const required_ = this.props.required;
    return (
      <div>
        {tags && tags.length && !this.props.multiple ? (
          <select
            defaultValue=""
            required={required_}
            className="form-control"
            id="tags-select"
            onChange={this.onChange}
          >
            <option value="">
              Select a tag
            </option>
            {this.renderTags(tags)}
          </select>
        ) : (
          <select
            multiple
            value={this.props.selectedTags}
            required={required_}
            className="form-control"
            id="tags-select"
            onChange={this.onMultipleChange}
          >
            {this.renderTags(tags)}
          </select>
        )}
      </div>
    );
  }
}
