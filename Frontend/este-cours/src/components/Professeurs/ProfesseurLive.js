import React, { Component } from 'react'
import ReactLivestream from 'react-livestream'

function OfflineComponent() {
    return (
      <div>
        <p>I am offline now, but checkout my stream on Fridays at 5 PM EST</p>
      </div>
    )
  }
   
export default class ProfesseurLive extends Component {
    render() {
        return (
            <div >
      <ReactLivestream
        platform="twitch"
        twitchClientId={'f90awg0o07briyxe94otaqo6haomsm'}
        twitchUserName="05202005"
      />
    </div>
        )
    }
}
