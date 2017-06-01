/**
 * Created by Jason Zhao Jie on 2016/12/13.
 */

/**
 * Copyright (c) 2015 ArmyAnt
 * 版权所有 (c) 2015 ArmyAnt
 *
 * Licensed under the BSD License, Version 2.0 (the License);
 * 本软件使用BSD协议保护, 协议版本:2.0
 * you may not use this file except in compliance with the License.
 * 使用本开源代码文件的内容, 视为同意协议
 * You can read the license content in the file "LICENSE" at the root of this project
 * 您可以在本项目的根目录找到名为"LICENSE"的文件, 来阅读协议内容
 * You may also obtain a copy of the License at
 * 您也可以在此处获得协议的副本:
 *
 *     http://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 除非法律要求或者版权所有者书面同意,本软件在本协议基础上的发布没有任何形式的条件和担保,无论明示的或默许的.
 * See the License for the specific language governing permissions and limitations under the License.
 * 请在特定限制或语言管理权限下阅读协议
 */
"use strict";
import libArmyAnt from "../../global.js"
import IAvatar from "../avatar.js"

export default class extends IAvatar {
    constructor() {
        super();
    }

        /**
         * Execute the drawing action for canvas avatar
         * @param context
         * @param parent
         */
        draw(context, parent) {
            let type = IAvatar.Type;
            if (typeof this.args.strokeColor !== libArmyAnt.magics.types.UNDEFINED && this.args.strokeColor) {
                context.strokeStyle = this.args.strokeColor;
                context.strokeRect(parent.x, parent.y, parent.width, parent.height);
            }
            switch(this.type) {
                case type.none:
                    break;
                case type.color:
                    context.fillStyle = this.args.color;
                    context.fillRect(parent.x, parent.y, parent.width, parent.height);
                    break;
                case type.image:
                    if (typeof this.args.img === libArmyAnt.magics.types.UNDEFINED || !this.args.img)
                        break;
                    if (typeof this.args.imgX === libArmyAnt.magics.types.UNDEFINED || !this.args.imgX)
                        this.args.imgX = 0;
                    if (typeof this.args.imgY === libArmyAnt.magics.types.UNDEFINED || !this.args.imgY)
                        this.args.imgY = 0;
                    if (typeof this.args.imgWidth === libArmyAnt.magics.types.UNDEFINED || !this.args.imgWidth)
                        this.args.imgWidth = this.args.img.width;
                    if (typeof this.args.imgHeight === libArmyAnt.magics.types.UNDEFINED || !this.args.imgHeight)
                        this.args.imgHeight = this.args.img.height;
                    if (typeof this.args.destX === libArmyAnt.magics.types.UNDEFINED || !this.args.destX)
                        this.args.destX = 0;
                    if (typeof this.args.destY === libArmyAnt.magics.types.UNDEFINED || !this.args.destY)
                        this.args.destY = 0;
                    if (typeof this.args.destWidth === libArmyAnt.magics.types.UNDEFINED || !this.args.destWidth)
                        this.args.destWidth = this.args.imgWidth;
                    if (typeof this.args.destHeight === libArmyAnt.magics.types.UNDEFINED || !this.args.destHeight)
                        this.args.destHeight = this.args.imgHeight;
                    context.drawImage(this.args.img, this.args.imgX, this.args.imgY, this.args.imgWidth, this.args.imgHeight,
                            parent.x + this.args.destX, parent.y + this.args.destY, this.args.destWidth, this.args.destHeight);
                    break;
                case type.action:
                    switch(this.args.action){
                        case IAvatar.Action.line:
                            context.lineTo(this.args.destX, this.args.destY);
                            break;
                    }
                    break;
            }
        }

        /**
         * Clean the target area of the canvas
         * @param context
         * @param parent
         */
        clean(context, parent) {

        }
}