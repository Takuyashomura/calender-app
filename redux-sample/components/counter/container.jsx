import { connect } from "react-redux";
import { increment, decrement } from "../../redux/count/action";

import Counter from "./presentation";

const mapStateToProps = ({ count }) => ({ count });

const mapDispatchToProps = dispatch => ({
    increment: count => {
        dispatch(increment(count));
    },

    decrement: count => {
        dispatch(decrement(count));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);