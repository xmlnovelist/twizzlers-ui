import React from 'react';
import { Link } from "react-router-dom";
import styles from './SearchResults.module.scss';
import _ from 'lodash';

type Props = {
    data: any;
    config?: any
};

const SearchResults: React.FC<Props> = (props) => {

  function display(key, res) {
    let val = _.get(res, key)
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  }

  function displayDate(key, res) {
    let val = _.get(res, key)
    let parts = val.split('T');
    return _.isNil(parts[0]) ? null : parts[0];
  }

  function getResults() {
    let snippet = props.config.snippet;
    let res = props.data.results.map((res, index) => {
        let items = snippet.items.map((it, index) => {
          return (
            <div key={"item-" + index} className={styles.items}>
              {display(it, res)}
            </div>
          )
        });
        return (
          <div key={"result-" + index} className={styles.result}>
            <div className={styles.thumbnail}>
              <img 
                src={display(snippet.thumbnail.src, res)} 
                alt={display(snippet.title, res)}
              ></img>
            </div>
            <div className={styles.text}>
              <div className={styles.createdOn}>
                Created on: {displayDate(snippet.createdOn, res)}
              </div>
              <div className={styles.title}>
                <Link to="/detail">{display(snippet.title, res)}</Link>
              </div>
              <div className={styles.subtitle}>
                <div className={styles.address}>
                  {display(snippet.address.street, res)},&nbsp;
                  {display(snippet.address.city, res)},&nbsp;
                  {display(snippet.address.state, res)}&nbsp;
                  {display(snippet.address.zip[0], res)}-
                  {display(snippet.address.zip[1], res)}
                </div>
                <div className={styles.phone}>
                  {display(snippet.phone, res)}
                </div>
                <div className={styles.email}>
                  {display(snippet.email, res)}
                </div>
                {items}
              </div>
            </div>
          </div>
        )
    });
    return res;
  }

  return (
    <div>
        {(props.data.results && props.data.results.length) > 0 ? (
            <div>{getResults()}</div>
        ) : null
        }
    </div>
  );
}

export default SearchResults;
