/**
 * @fileoverview The event generator for AST nodes.
 * @author Ilya Volodin
 * @copyright 2015 Ilya Volodin. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

"use strict";
//------------------------------------------------------------------------------
// Private helpers
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * The event generator for AST node selectors.
 * This implements below interface.
 *
 * ```ts
 * interface EventGenerator {
 *     emitter: EventEmitter;
 *     enterNode(node: ASTNode): void;
 *     leaveNode(node: ASTNode): void;
 * }
 * ```
 *
 * @param {EventEmitter} emitter - An event emitter which is the destination of events.
 * @returns {NodeEventGenerator} new instance.
 */
function NodeEventGenerator(emitter) {
    this.selectors = null;
    this.emitter = emitter;
}

NodeEventGenerator.prototype = {
    constructor: NodeEventGenerator,

    /**
     * Emits an event of entering AST node.
     * @param {ASTNode} node - A node which was entered.
     * @returns {void}
     */
    enterNode: function enterNode(node) {
        if (!this.selectors) {
            // poplulate all of the selectors on the first node
            this.selectors = Object.keys(this._events).map(function(selector) {
                return parseSelector(selector);
            });
        }
        this.emitter.emit(node.type);
    },

    /**
     * Emits an event of leaving AST node.
     * @param {ASTNode} node - A node which was left.
     * @returns {void}
     */
    leaveNode: function leaveNode(node) {
        this.emitter.emit(node.type + ":exit", node);
    }
};

module.exports = NodeEventGenerator;
