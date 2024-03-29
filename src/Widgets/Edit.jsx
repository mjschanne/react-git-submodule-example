import React from 'react';
import { connect } from 'react-redux';
import { addWidget, updateWidget } from './actions';

class Edit extends React.Component {
    constructor(props) {
        super(props);

        const defaultWidget = {
            id: 0,
            name: '',
            category: '',
            supplier: '',
            cost: 0,
            price: 0,
            volume: 0
        };

        this.state = {
            pristineWidget: defaultWidget,
            widget: defaultWidget
        };
    };

    handleSubmit = e => {
        e.preventDefault();

        // todo: form validation

        this.state.widget.id > 0 ?
            this.props.updateWidget(this.state.widget) :
            this.props.addWidget(this.state.widget);

        this.props.history.push('/widgets/list');
    };

    componentDidMount = () => {
        const { id } = this.props.match.params;
        const widget = this.props.widgets.find(w => w.id === parseInt(id));

        if (!!widget)
            this.setState({ pristineWidget: widget, widget: widget });
    };


    render = () => {
        return <React.Fragment>
            <h1>Widgets Edit</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        placeholder='Enter name'
                        value={this.state.widget.name}
                        onChange={e => this.setState({ widget: { ...this.state.widget, name: e.target.value } })} />
                </div>


                <div className='form-row'>
                    <div className='col'>
                        <div className='form-group'>
                            <label htmlFor='category'>Category</label>
                            <select
                                type='text'
                                id='category'
                                name='category'
                                className='form-control'
                                value={this.state.widget.category}
                                onChange={e => this.setState({ widget: { ...this.state.widget, category: e.target.value } })}>
                                <option value=''>Choose category</option>
                                {this.props.widgetCategories.map(wc => <option key={wc} value={wc}>{wc}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='form-group'>
                            <label htmlFor='supplier'>Supplier</label>
                            <select
                                type='text'
                                id='supplier'
                                name='supplier'
                                className='form-control'
                                value={this.state.widget.supplier}
                                onChange={e => this.setState({ supplier: { ...this.state.widget, supplier: e.target.value } })}>
                                <option value=''>Choose supplier</option>
                                {this.props.suppliers.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className='form-row'>
                    <div className='col'>
                        <div className='form-group'>
                            <label htmlFor='cost'>Cost</label>
                            <input
                                type='number'
                                id='cost'
                                name='cost'
                                className='form-control'
                                placeholder='Enter cost'
                                value={this.state.widget.cost}
                                onChange={e => this.setState({ widget: { ...this.state.widget, cost: e.target.value } })} />
                        </div>
                    </div>

                    <div className='col'>
                        <div className='form-group'>
                            <label htmlFor='price'>Price</label>
                            <input
                                type='number'
                                id='price'
                                name='price'
                                className='form-control'
                                placeholder='Enter price'
                                value={this.state.widget.price}
                                onChange={e => this.setState({ widget: { ...this.state.widget, price: e.target.value } })} />
                        </div>
                    </div>

                    <div className='col'>
                        <div className='form-group'>
                            <label htmlFor='volume'>Volume</label>
                            <input
                                type='number'
                                id='volume'
                                name='volume'
                                className='form-control'
                                placeholder='Enter volume'
                                value={this.state.widget.volume}
                                onChange={e => this.setState({ widget: { ...this.state.widget, volume: e.target.value } })} />
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col offset-md-9'>
                        <div className='form-group'>
                            <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='form-group'>
                            <button type='reset' className='btn btn-secondary' onClick={() => this.setState({ widget: this.state.pristineWidget })}>Reset</button>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment >;
    }
};

const mapStateToProps = state => {
    return {
        suppliers: state.platform.suppliers,
        widgets: state.widget.widgets,
        widgetCategories: state.widget.widgetCategories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addWidget: widget => {
            dispatch(addWidget(widget));
        },
        updateWidget: updatedWidget => {
            dispatch(updateWidget(updatedWidget));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);