<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    minTitle: {
      type: String,
      default: ''
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  render(h, context) {
    const { icon, title, isCollapse, minTitle } = context.props;
    const vnodes = [];
    if (isCollapse) {
      vnodes.push(<span>{minTitle}</span>);
    } else {
      // vnodes.push(<svg-icon icon-class={icon} />)
      vnodes.push(<span class={icon}/>);
      vnodes.push(<span slot='title'>{title}</span>);
    }
    return vnodes;
  }
};
</script>
